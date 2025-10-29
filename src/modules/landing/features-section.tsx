"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, DollarSign, Clock, FileText, Briefcase, ArrowRight } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description:
        "Complete employee lifecycle management with digital profiles, onboarding workflows, and role-based access control.",
      benefits: ["Digital employee records", "Invitation system", "Department management"],
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description:
        "Monitor employee attendance with real-time tracking, detailed reporting, and automated notifications.",
      benefits: ["Real-time tracking", "Automated reports", "Attendance analytics"],
    },
    {
      icon: Calendar,
      title: "Leave Management",
      description: "AI-powered leave management with intelligent approvals, balance tracking, and policy automation.",
      benefits: ["AI-based approvals", "Policy automation", "Balance tracking"],
    },
    {
      icon: DollarSign,
      title: "Payroll Processing",
      description: "Automated payroll calculations with tax compliance, payslip generation, and salary management.",
      benefits: ["Automated calculations", "Digital payslips", "Salary management"],
    },
    {
      icon: Briefcase,
      title: "Recruitment",
      description: "AI-powered recruitment with resume screening, job posting management, and application tracking.",
      benefits: ["AI resume screening", "Job posting system", "Application tracking"],
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document storage with AI-powered knowledge chat for instant information retrieval.",
      benefits: ["Document storage", "AI knowledge chat", "Instant search"],
    },
  ]

  return (
    <section id="features" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
              Core Features
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight"
          >
            Everything Your HR Team Needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed"
          >
            Comprehensive HR management tools designed for modern workplaces. Streamline processes, reduce manual work,
            and empower your team.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="group relative h-full border-border/50 bg-card hover:border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardContent className="relative p-6 flex flex-col h-full">
                  <div className="bg-primary/10 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg group-hover:bg-primary/15 transition-colors">
                    <feature.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="text-muted-foreground flex items-center text-sm">
                        <ArrowRight className="text-primary/60 mr-2 h-3 w-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
