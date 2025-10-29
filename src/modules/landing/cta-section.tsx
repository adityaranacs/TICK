"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, Brain, Calendar, Mail, LinkedinIcon } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const ctaFeatures = [
    "Complete employee lifecycle management",
    "AI-powered automation and insights",
    "Advanced payroll and attendance tracking",
    "Document management with AI chat",
    "Role-based access and permissions",
    "Real-time analytics and reporting",
  ]

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-4xl">
        {/* Main CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="border-border/50 bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8 text-center sm:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                  <Brain className="mr-2 h-3 w-3" />
                  Ready to Get Started?
                </Badge>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight"
              >
                Transform Your HR Operations <span className="text-primary">Today</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg leading-relaxed"
              >
                Join the revolution in HR management. Experience the power of AI-driven automation and seamless employee
                experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mx-auto mb-8 max-w-2xl grid grid-cols-1 gap-3 sm:grid-cols-2 text-left"
              >
                {ctaFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base font-semibold gap-2 bg-foreground text-background hover:bg-foreground/90"
                  >
                    Start For Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border/50 hover:border-border h-12 border px-8 text-base font-semibold bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Demo
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground mt-8 text-sm"
              >
                No credit card required • Setup in minutes • Cancel anytime
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4 text-sm">
            For further inquiries or project collaborations, feel free to reach out.
          </p>
          <div className="flex flex-row items-center justify-center gap-6">
            <div className="text-muted-foreground flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4" />
              <a
                href="mailto:hi@example.com"
                className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                hi@example.com
              </a>
            </div>
            <div className="text-muted-foreground flex items-center text-sm">
              <LinkedinIcon className="mr-2 h-4 w-4" />
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-muted-foreground absolute bottom-4 left-1/2 w-full -translate-x-1/2 transform text-center text-xs sm:bottom-6 sm:text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </section>
  )
}
