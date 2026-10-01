import { z } from "zod";

export const interestOptions = [
  "Educação",
  "Segurança alimentar",
  "Meio ambiente",
  "Comunicação",
  "Eventos",
] as const;

export const volunteerSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo.").max(100, "Use até 100 caracteres."),
  email: z.string().trim().email("Digite um e-mail válido.").max(255),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Use o formato 000.000.000-00.").refine(isValidCpf, "Digite um CPF válido."),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Use o formato (00) 00000-0000."),
  birthDate: z.string().min(1, "Informe sua data de nascimento."),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "Use o formato 00000-000."),
  address: z.string().trim().min(5, "Informe o endereço completo.").max(160),
  city: z.string().trim().min(2, "Informe sua cidade.").max(80),
  state: z.string().length(2, "Selecione o estado."),
  interest: z.enum(interestOptions, { message: "Selecione uma área de interesse." }),
  message: z.string().trim().min(10, "Conte em pelo menos 10 caracteres como gostaria de ajudar.").max(500, "Use até 500 caracteres."),
  terms: z.preprocess((value) => value === true || value === "on", z.literal(true, { errorMap: () => ({ message: "Aceite os termos para continuar." }) })),
});

export type Volunteer = z.infer<typeof volunteerSchema> & { id: string; createdAt: string };

export function maskCpf(value: string) {
  return value.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string) {
  return value.replace(/\D/g, "").slice(0, 11).replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export function maskCep(value: string) {
  return value.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

export function isValidCpf(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const calculateDigit = (length: number) => {
    const sum = digits.slice(0, length).split("").reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };
  return calculateDigit(9) === Number(digits[9]) && calculateDigit(10) === Number(digits[10]);
}

export function saveVolunteer(volunteer: Volunteer) {
  const key = "ong-esperanca-voluntarios";
  const currentValue = localStorage.getItem(key);
  let volunteers: Volunteer[] = [];

  if (currentValue) {
    try {
      const parsed: unknown = JSON.parse(currentValue);
      if (Array.isArray(parsed)) volunteers = parsed as Volunteer[];
    } catch {
      volunteers = [];
    }
  }

  localStorage.setItem(key, JSON.stringify([...volunteers, volunteer]));
}

export function loadLatestVolunteer(): Volunteer | null {
  const currentValue = localStorage.getItem("ong-esperanca-voluntarios");
  if (!currentValue) return null;
  try {
    const parsed: unknown = JSON.parse(currentValue);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    const result = volunteerSchema.safeParse(parsed.at(-1));
    if (!result.success) return null;
    const latest = parsed.at(-1) as Record<string, unknown>;
    return { ...result.data, id: String(latest['id'] ?? ''), createdAt: String(latest['createdAt'] ?? '') };
  } catch {
    return null;
  }
}