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
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Use o formato 000.000.000-00."),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Use o formato (00) 00000-0000."),
  birthDate: z.string().min(1, "Informe sua data de nascimento."),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "Use o formato 00000-000."),
  address: z.string().trim().min(5, "Informe o endereço completo.").max(160),
  city: z.string().trim().min(2, "Informe sua cidade.").max(80),
  state: z.string().length(2, "Selecione o estado."),
  interest: z.enum(interestOptions, { message: "Selecione uma área de interesse." }),
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