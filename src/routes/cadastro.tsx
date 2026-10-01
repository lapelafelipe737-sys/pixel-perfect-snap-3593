import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, HeartHandshake, ShieldCheck, UserRound } from "lucide-react";
import {
  cloneElement,
  type FocusEvent,
  type FormEvent,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
  interestOptions,
  loadLatestVolunteer,
  maskCep,
  maskCpf,
  maskPhone,
  saveVolunteer,
  volunteerSchema,
} from "@/lib/volunteer";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Seja voluntário — ONG Esperança" },
      {
        name: "description",
        content: "Cadastre-se para fazer parte da rede de voluntariado da ONG Esperança.",
      },
      { property: "og:title", content: "Seja voluntário — ONG Esperança" },
      {
        property: "og:description",
        content: "Doe seu tempo e talento para transformar comunidades com a ONG Esperança.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VolunteerPage,
});

type Errors = Record<string, string>;

function VolunteerPage() {
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const latest = loadLatestVolunteer();
    const form = formRef.current;
    if (!latest || !form) return;
    Object.entries(latest).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = Boolean(value);
      } else if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      )
        field.value = String(value);
    });
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const result = volunteerSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: Errors = {};
      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0]);
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      setSuccess(false);
      const firstInvalidField = Object.keys(nextErrors)[0];
      if (firstInvalidField) document.getElementById(firstInvalidField)?.focus();
      return;
    }
    const saved = saveVolunteer({
      ...result.data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
    if (!saved) {
      setErrors({
        form: "Não foi possível salvar neste dispositivo. Libere espaço e tente novamente.",
      });
      setSuccess(false);
      return;
    }
    form.reset();
    setErrors({});
    setSuccess(true);
    window.setTimeout(() => setSuccess(false), 5000);
  }

  function validateField(
    event: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const form = event.currentTarget.form;
    if (!form) return;
    const values = Object.fromEntries(new FormData(form).entries());
    const result = volunteerSchema.safeParse(values);
    const issue = result.success
      ? undefined
      : result.error.issues.find((item) => item.path[0] === event.target.name);
    setErrors((current) => ({ ...current, [event.target.name]: issue?.message ?? "" }));
  }

  return (
    <main id="conteudo" className="bg-muted">
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="site-container grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-sun">Voluntariado</p>
            <h1 className="mt-5 font-display text-5xl font-bold sm:text-6xl">
              Seu tempo pode mudar uma história.
            </h1>
          </div>
          <p className="text-lg leading-8 text-primary-foreground/75 lg:col-span-4">
            Conte um pouco sobre você. Nossa equipe entrará em contato para encontrar a melhor forma
            de participar.
          </p>
        </div>
      </section>

      <section className="site-container grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
        <aside className="lg:col-span-4">
          <div className="sticky top-28">
            <HeartHandshake className="size-10 text-accent" />
            <h2 className="mt-5 font-display text-3xl font-bold">Antes de começar</h2>
            <ul className="mt-6 space-y-5 text-sm leading-6 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" /> Você escolhe a área
                que combina com seus talentos.
              </li>
              <li className="flex gap-3">
                <UserRound className="mt-0.5 size-5 shrink-0 text-accent" /> A equipe conversa com
                você antes de qualquer atividade.
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /> Seus dados ficam
                salvos somente neste dispositivo.
              </li>
            </ul>
          </div>
        </aside>

        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          className="bg-background p-6 shadow-sm sm:p-10 lg:col-span-8"
          aria-label="Cadastro de voluntário"
        >
          <div className="border-b border-border pb-6">
            <p className="text-sm font-bold text-accent">Cadastro de voluntário</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Dados pessoais</h2>
            <p className="mt-2 text-sm text-muted-foreground">Todos os campos são obrigatórios.</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field id="name" label="Nome completo" error={errors["name"]} className="sm:col-span-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={3}
                maxLength={100}
                autoComplete="name"
                onBlur={validateField}
              />
            </Field>
            <Field id="email" label="E-mail" error={errors["email"]}>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                onBlur={validateField}
              />
            </Field>
            <Field id="cpf" label="CPF" hint="000.000.000-00" error={errors["cpf"]}>
              <input
                id="cpf"
                name="cpf"
                type="text"
                required
                minLength={14}
                maxLength={14}
                inputMode="numeric"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                onInput={(event) => {
                  event.currentTarget.value = maskCpf(event.currentTarget.value);
                }}
                onBlur={validateField}
              />
            </Field>
            <Field id="phone" label="Telefone" hint="(00) 00000-0000" error={errors["phone"]}>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                minLength={15}
                maxLength={15}
                autoComplete="tel"
                inputMode="tel"
                pattern="\(\d{2}\) \d{5}-\d{4}"
                onInput={(event) => {
                  event.currentTarget.value = maskPhone(event.currentTarget.value);
                }}
                onBlur={validateField}
              />
            </Field>
            <Field id="birthDate" label="Data de nascimento" error={errors["birthDate"]}>
              <input id="birthDate" name="birthDate" type="date" required onBlur={validateField} />
            </Field>
          </div>

          <div className="mt-10 border-b border-border pb-5">
            <h2 className="font-display text-2xl font-bold">Onde você mora</h2>
          </div>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <Field id="cep" label="CEP" hint="00000-000" error={errors["cep"]}>
              <input
                id="cep"
                name="cep"
                type="text"
                required
                minLength={9}
                maxLength={9}
                inputMode="numeric"
                autoComplete="postal-code"
                pattern="\d{5}-\d{3}"
                onInput={(event) => {
                  event.currentTarget.value = maskCep(event.currentTarget.value);
                }}
                onBlur={validateField}
              />
            </Field>
            <Field
              id="address"
              label="Endereço"
              error={errors["address"]}
              className="sm:col-span-2"
            >
              <input
                id="address"
                name="address"
                type="text"
                required
                minLength={5}
                maxLength={160}
                autoComplete="street-address"
                onBlur={validateField}
              />
            </Field>
            <Field id="city" label="Cidade" error={errors["city"]}>
              <input
                id="city"
                name="city"
                type="text"
                required
                minLength={2}
                maxLength={80}
                autoComplete="address-level2"
                onBlur={validateField}
              />
            </Field>
            <Field id="state" label="Estado" error={errors["state"]}>
              <select
                id="state"
                name="state"
                required
                autoComplete="address-level1"
                defaultValue=""
                onBlur={validateField}
              >
                <option value="" disabled>
                  Selecione
                </option>
                {[
                  "AC",
                  "AL",
                  "AP",
                  "AM",
                  "BA",
                  "CE",
                  "DF",
                  "ES",
                  "GO",
                  "MA",
                  "MT",
                  "MS",
                  "MG",
                  "PA",
                  "PB",
                  "PR",
                  "PE",
                  "PI",
                  "RJ",
                  "RN",
                  "RS",
                  "RO",
                  "RR",
                  "SC",
                  "SP",
                  "SE",
                  "TO",
                ].map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </Field>
            <Field
              id="interest"
              label="Área de interesse"
              error={errors["interest"]}
              className="sm:col-span-2"
            >
              <select id="interest" name="interest" required defaultValue="" onBlur={validateField}>
                <option value="" disabled>
                  Como você gostaria de ajudar?
                </option>
                {interestOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field
              id="message"
              label="Mensagem"
              hint="10 a 500 caracteres"
              error={errors["message"]}
              className="sm:col-span-2"
            >
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={500}
                rows={5}
                onBlur={validateField}
              />
            </Field>
            <div className="sm:col-span-2">
              <div className="flex items-start gap-3 text-sm leading-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  onChange={validateField}
                  className="mt-1 size-5 shrink-0 accent-primary"
                  aria-invalid={Boolean(errors["terms"])}
                  aria-describedby={errors["terms"] ? "terms-error" : undefined}
                />
                <label htmlFor="terms" className="cursor-pointer">
                  Concordo com o uso dos meus dados exclusivamente para contato sobre atividades de
                  voluntariado.
                </label>
              </div>
              {errors["terms"] && (
                <p id="terms-error" className="mt-1 text-xs font-semibold text-destructive">
                  {errors["terms"]}
                </p>
              )}
            </div>
          </div>
          {Object.keys(errors).some((key) => errors[key]) && (
            <div
              role="alert"
              className="mt-7 border-l-4 border-destructive bg-error-soft p-4 text-sm text-destructive"
            >
              {errors["form"] ?? "Revise os campos destacados antes de enviar."}
            </div>
          )}
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-xs leading-5 text-muted-foreground">
              Ao enviar, você concorda com o uso destes dados para contato sobre voluntariado.
            </p>
            <Button type="submit" size="lg">
              Enviar cadastro
            </Button>
          </div>
        </form>
      </section>

      {success && (
        <div
          className="fixed bottom-5 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 bg-success p-4 text-success-foreground shadow-xl"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <div>
            <strong className="block">Cadastro enviado!</strong>
            <span className="text-sm text-success-foreground/80">
              Em breve, nossa equipe entrará em contato.
            </span>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  className?: string | undefined;
  children: ReactElement<Record<string, unknown>>;
}) {
  const control = cloneElement(children, {
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
  });
  return (
    <div className={`field ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id}>{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className={error ? "field-control field-error" : "field-control"}>{control}</div>
      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
