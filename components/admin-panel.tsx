"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, ImagePlus, LogOut, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import type { Project, Service, SiteContent } from "@/lib/types";
import { ContentProvider, useSiteContent } from "@/components/content-provider";
import { LandingPage } from "@/components/landing-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { inferProjectCopy, slugify } from "@/lib/utils";

const FALLBACK_IMAGE = "/projects/placeholder.svg";
const sections = ["Hero", "About", "Services", "Projects", "Contact", "Design", "SEO"];

export function AdminPanel({ initialContent }: { initialContent: SiteContent }) {
  return (
    <ContentProvider initialContent={initialContent}>
      <AdminShell />
    </ContentProvider>
  );
}

function AdminShell() {
  const { isAdminAuthed, login } = useSiteContent();
  const [error, setError] = useState("");

  if (!isAdminAuthed) {
    return (
      <main className="grid min-h-screen place-items-center bg-neutral-950 px-4 text-white">
        <Card className="w-full max-w-md border-white/10 bg-white/[0.06] text-white">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                const form = new FormData(event.currentTarget);
                const ok = login(String(form.get("username")), String(form.get("password")));
                setError(ok ? "" : "Invalid username or password.");
              }}
            >
              <Input name="username" placeholder="Username" className="bg-white text-neutral-950" />
              <Input name="password" type="password" placeholder="Password" className="bg-white text-neutral-950" />
              {error ? <p className="text-sm text-orange-300">{error}</p> : null}
              <Button type="submit">Login</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return <Editor />;
}

function Editor() {
  const { content, setContent, resetContent, logout } = useSiteContent();
  const [active, setActive] = useState("Hero");
  const [preview, setPreview] = useState(false);

  const update = (next: Partial<SiteContent>) => setContent({ ...content, ...next });
  const visibilityKeys = Object.keys(content.visibility);

  if (preview) {
    return (
      <div>
        <div className="fixed bottom-4 left-4 right-4 z-[70] flex gap-2 sm:right-auto">
          <Button onClick={() => setPreview(false)}>
            <Eye size={16} /> Back to editor
          </Button>
        </div>
        <LandingPage initialContent={content} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r bg-neutral-950 p-5 text-white lg:block">
        <h1 className="font-display text-2xl font-semibold">BSC Admin</h1>
        <p className="mt-2 text-sm text-white/55">Edit the live website content.</p>
        <nav className="mt-8 grid gap-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActive(section)}
              className={`rounded-md px-3 py-2 text-left text-sm font-semibold transition ${active === section ? "bg-white text-neutral-950" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
            >
              {section}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 grid gap-2">
          <Button onClick={() => setPreview(true)}>
            <Eye size={16} /> Live Preview
          </Button>
          <Button
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
            onClick={resetContent}
          >
            <RotateCcw size={16} /> Reset Content
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10" onClick={logout}>
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b bg-background/90 p-3 backdrop-blur sm:p-4">
          <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Hidden route</p>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">/{active.toLowerCase()}</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <select
                value={active}
                onChange={(event) => setActive(event.target.value)}
                className="col-span-2 h-10 rounded-md border bg-background px-3 text-sm sm:col-span-1 lg:hidden"
              >
                {sections.map((section) => (
                  <option key={section}>{section}</option>
                ))}
              </select>
              <Button className="w-full sm:w-auto" onClick={() => setPreview(true)}>
                <Eye size={16} /> Preview
              </Button>
              <Button className="w-full sm:w-auto" variant="outline" onClick={logout}>
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </div>
        </header>

        <div className="grid gap-5 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6 lg:p-8">
          <section className="grid gap-6">
            {active === "Hero" ? <HeroEditor content={content} update={update} /> : null}
            {active === "About" ? <AboutEditor content={content} update={update} /> : null}
            {active === "Services" ? <ServicesEditor content={content} setContent={setContent} /> : null}
            {active === "Projects" ? <ProjectsEditor content={content} setContent={setContent} /> : null}
            {active === "Contact" ? <ContactEditor content={content} update={update} /> : null}
            {active === "Design" ? <DesignEditor content={content} update={update} /> : null}
            {active === "SEO" ? <SeoEditor content={content} update={update} /> : null}
          </section>
          <aside className="grid content-start gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Visibility</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {visibilityKeys.map((key) => (
                  <div className="flex items-center justify-between" key={key}>
                    <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
                    <Switch
                      checked={content.visibility[key]}
                      onCheckedChange={(checked) =>
                        setContent({ ...content, visibility: { ...content.visibility, [key]: checked } })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Save Status</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Save size={16} className="text-primary" /> Changes save instantly in local storage.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function HeroEditor({ content, update }: EditorProps) {
  return (
    <Panel title="Hero Section">
      <Field label="Label">
        <Input
          value={content.hero.label}
          onChange={(e) => update({ hero: { ...content.hero, label: e.target.value } })}
        />
      </Field>
      <Field label="Headline (one line per row)">
        <Textarea
          value={content.hero.headline.join("\n")}
          onChange={(e) =>
            update({
              hero: {
                ...content.hero,
                headline: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean)
              }
            })
          }
        />
      </Field>
      <Field label="Supporting text">
        <Textarea
          value={content.hero.supporting}
          onChange={(e) => update({ hero: { ...content.hero, supporting: e.target.value } })}
        />
      </Field>
      <ImagePicker
        label="Hero background"
        value={content.hero.backgroundImage}
        onChange={(image) => update({ hero: { ...content.hero, backgroundImage: image } })}
      />
      <ImagePicker
        label="Secondary image"
        value={content.hero.secondaryImage || ""}
        onChange={(image) => update({ hero: { ...content.hero, secondaryImage: image } })}
      />
    </Panel>
  );
}

function AboutEditor({ content, update }: EditorProps) {
  return (
    <Panel title="About Section">
      <Field label="Eyebrow">
        <Input
          value={content.about.eyebrow}
          onChange={(e) => update({ about: { ...content.about, eyebrow: e.target.value } })}
        />
      </Field>
      <Field label="Headline (one line per row)">
        <Textarea
          value={content.about.headline.join("\n")}
          onChange={(e) =>
            update({
              about: {
                ...content.about,
                headline: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean)
              }
            })
          }
        />
      </Field>
      <Field label="Introduction">
        <Textarea
          value={content.about.body}
          onChange={(e) => update({ about: { ...content.about, body: e.target.value } })}
        />
      </Field>
      <Field label="Mission">
        <Textarea
          value={content.about.mission}
          onChange={(e) => update({ about: { ...content.about, mission: e.target.value } })}
        />
      </Field>
      <ImagePicker
        label="About image"
        value={content.about.image}
        onChange={(image) => update({ about: { ...content.about, image } })}
      />
    </Panel>
  );
}

function ServicesEditor({ content, setContent }: ContentEditorProps) {
  return (
    <Panel title="Services">
      <div className="grid gap-4">
        {content.services.map((service, index) => (
          <Card key={index}>
            <CardContent className="grid gap-3">
              <Input
                value={service.number}
                placeholder="01"
                onChange={(e) =>
                  patchArray(content, setContent, "services", index, { ...service, number: e.target.value })
                }
              />
              <Input
                value={service.title}
                onChange={(e) =>
                  patchArray(content, setContent, "services", index, { ...service, title: e.target.value })
                }
              />
              <Textarea
                value={service.description}
                onChange={(e) =>
                  patchArray(content, setContent, "services", index, { ...service, description: e.target.value })
                }
              />
              <Input
                value={service.image}
                placeholder="Image path"
                onChange={(e) =>
                  patchArray(content, setContent, "services", index, { ...service, image: e.target.value })
                }
              />
              <Button variant="outline" onClick={() => removeArray(content, setContent, "services", index)}>
                <Trash2 size={16} /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        onClick={() =>
          setContent({
            ...content,
            services: [
              ...content.services,
              {
                number: String(content.services.length + 1).padStart(2, "0"),
                title: "New Service",
                description: "Service description",
                image: "/projects/placeholder.svg"
              }
            ]
          })
        }
      >
        <Plus size={16} /> Add Service
      </Button>
    </Panel>
  );
}

function ProjectsEditor({ content, setContent }: ContentEditorProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const additions = await Promise.all(
      Array.from(files).map(async (file, index) => {
        const image = await readFile(file);
        const copy = inferProjectCopy(file.name, index);
        return {
          id: `${slugify(copy.title)}-${Date.now()}-${index}`,
          image,
          ...copy
        };
      })
    );
    setContent({ ...content, projects: [...content.projects, ...additions] });
  };

  return (
    <Panel title="Projects and Gallery">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-5 text-center transition hover:bg-muted sm:p-8">
        <ImagePlus className="mb-3 text-primary" />
        <span className="font-semibold">Upload project images</span>
        <span className="text-sm text-muted-foreground">
          Titles and descriptions are generated from image/file context and can be edited.
        </span>
        <input className="hidden" type="file" accept="image/*" multiple onChange={(e) => addFiles(e.target.files)} />
      </label>
      <div className="grid gap-4">
        {content.projects.map((project, index) => (
          <Card
            key={project.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (dragIndex === null || dragIndex === index) return;
              const next = [...content.projects];
              const [item] = next.splice(dragIndex, 1);
              next.splice(index, 0, item);
              setContent({ ...content, projects: next });
              setDragIndex(null);
            }}
          >
            <CardContent className="grid gap-4 p-4 sm:p-6 md:grid-cols-[160px_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                <SafeImage src={project.image} alt={project.title} fill className="object-cover" />
              </div>
              <div className="grid gap-3">
                <Input
                  value={project.title}
                  onChange={(e) =>
                    patchArray(content, setContent, "projects", index, { ...project, title: e.target.value })
                  }
                />
                <Input
                  value={project.category}
                  onChange={(e) =>
                    patchArray(content, setContent, "projects", index, { ...project, category: e.target.value })
                  }
                />
                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    patchArray(content, setContent, "projects", index, { ...project, description: e.target.value })
                  }
                />
                <Button variant="outline" onClick={() => removeArray(content, setContent, "projects", index)}>
                  <Trash2 size={16} /> Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Panel>
  );
}

function ContactEditor({ content, update }: EditorProps) {
  return (
    <Panel title="Contact Details">
      {(["phone", "email", "address", "whatsapp", "mapEmbed"] as const).map((key) => (
        <Field key={key} label={key}>
          <Input
            value={content.contact[key]}
            onChange={(e) => update({ contact: { ...content.contact, [key]: e.target.value } })}
          />
        </Field>
      ))}
    </Panel>
  );
}

function DesignEditor({ content, update }: EditorProps) {
  return (
    <Panel title="Colors">
      {(["accent", "sand", "dark"] as const).map((key) => (
        <Field key={key} label={key}>
          <Input
            type="color"
            value={content.theme[key]}
            onChange={(e) => update({ theme: { ...content.theme, [key]: e.target.value } })}
          />
        </Field>
      ))}
      <p className="text-sm text-muted-foreground">
        Theme values are stored for deployment customization and future design tuning.
      </p>
    </Panel>
  );
}

function SeoEditor({ content, update }: EditorProps) {
  return (
    <Panel title="SEO Metadata">
      <Field label="Title">
        <Input
          value={content.seo.title}
          onChange={(e) => update({ seo: { ...content.seo, title: e.target.value } })}
        />
      </Field>
      <Field label="Description">
        <Textarea
          value={content.seo.description}
          onChange={(e) => update({ seo: { ...content.seo, description: e.target.value } })}
        />
      </Field>
      <Field label="Keywords">
        <Input
          value={content.seo.keywords.join(", ")}
          onChange={(e) =>
            update({
              seo: {
                ...content.seo,
                keywords: e.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              }
            })
          }
        />
      </Field>
    </Panel>
  );
}

type EditorProps = {
  content: SiteContent;
  update: (next: Partial<SiteContent>) => void;
};

type ContentEditorProps = {
  content: SiteContent;
  setContent: (content: SiteContent) => void;
};

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 p-4 sm:p-6">{children}</CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label className="capitalize">{label}</Label>
      {children}
    </div>
  );
}

function ImagePicker({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <div className="grid gap-3 sm:grid-cols-[180px_minmax(0,1fr)]">
        <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
          {value ? <SafeImage src={value} alt={label} fill className="object-cover" /> : null}
        </div>
        <div className="grid content-center gap-3">
          <Input value={value} onChange={(event) => onChange(event.target.value)} />
          <Input
            type="file"
            accept="image/*"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (file) onChange(await readFile(file));
            }}
          />
        </div>
      </div>
    </Field>
  );
}

function patchArray<K extends "services" | "projects">(
  content: SiteContent,
  setContent: (content: SiteContent) => void,
  key: K,
  index: number,
  value: K extends "services" ? Service : Project
) {
  const next = [...content[key]] as Array<Service | Project>;
  next[index] = value;
  setContent({ ...content, [key]: next });
}

function removeArray<K extends "services" | "projects">(
  content: SiteContent,
  setContent: (content: SiteContent) => void,
  key: K,
  index: number
) {
  const next = [...content[key]];
  next.splice(index, 1);
  setContent({ ...content, [key]: next });
}

function readFile(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

function SafeImage({ src, alt, ...props }: React.ComponentProps<typeof Image>) {
  const [value, setValue] = useState(src || FALLBACK_IMAGE);

  return <Image {...props} src={value} alt={alt} onError={() => setValue(FALLBACK_IMAGE)} />;
}
