import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Please add your name"),
  email: z.string().email("Please use a valid email"),
  message: z.string().min(10, "Tell me a little about what you need"),
});

type Values = z.infer<typeof schema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: Values) => {
    toast({
      title: "Message drafted",
      description: "I’ll reply within 1–2 business days.",
    });

    form.reset();
    void values;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-noise">
        <div className="mx-auto w-full max-w-4xl px-5 py-14 sm:px-8 sm:py-18">
          <Link href="/">
            <a
              data-testid="link-contact-back"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </a>
          </Link>

          <div className="mt-8">
            <h1
              data-testid="text-contact-title"
              className="font-serif text-4xl tracking-[-0.02em] sm:text-5xl"
            >
              Work With Me
            </h1>
            <p
              data-testid="text-contact-subtitle"
              className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base"
            >
              If you want a website that feels right, let’s talk.
            </p>
          </div>

          <Card className="mt-10 border-border/70 bg-card/45 p-6 shadow-sm sm:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="label-name">Name</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-name"
                            placeholder="Your name"
                            className="h-11 rounded-xl border-border/70 bg-background/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage data-testid="error-name" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel data-testid="label-email">Email</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-email"
                            placeholder="you@domain.com"
                            className="h-11 rounded-xl border-border/70 bg-background/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage data-testid="error-email" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-testid="label-message">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          data-testid="textarea-message"
                          placeholder="What are you building? What does success look like?"
                          className="min-h-[140px] resize-none rounded-xl border-border/70 bg-background/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage data-testid="error-message" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    data-testid="text-contact-reassure"
                    className="text-xs text-muted-foreground"
                  >
                    Fast replies. Clear communication. No pressure.
                  </p>

                  <Button
                    data-testid="button-submit"
                    type="submit"
                    className="h-11 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
                  >
                    Send
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </main>
  );
}
