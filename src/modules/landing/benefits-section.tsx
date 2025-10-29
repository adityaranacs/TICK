"use client"

import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle, Brain, Zap, FileText, BarChart3 } from "lucide-react"

export function BenefitsSection() {
  const comparisons = [
    {
      category: "Resume Screening",
      traditional: {
        icon: X,
        title: "Manual Review",
        description: "Hours spent reading each resume manually",
        problems: ["Time consuming", "Human bias", "Inconsistent evaluation"],
      },
      modern: {
        icon: Brain,
        title: "AI-Powered Screening",
        description: "Intelligent evaluation in seconds",
        benefits: ["90% faster", "Bias-free analysis", "Consistent scoring"],
      },
    },
    {
      category: "Leave Management",
      traditional: {
        icon: X,
        title: "Paper Forms & Email",
        description: "Manual approval process with spreadsheets",
        problems: ["Lost requests", "Manual tracking", "Delayed approvals"],
      },
      modern: {
        icon: CheckCircle,
        title: "AI Leave Management",
        description: "Smart approvals based on team capacity",
        benefits: ["Instant decisions", "Team optimization", "Automated tracking"],
      },
    },
    {
      category: "Document Access",
      traditional: {
        icon: X,
        title: "File Searching",
        description: "Digging through folders and documents",
        problems: ["Time wasted", "Information silos", "Outdated policies"],
      },
      modern: {
        icon: FileText,
        title: "AI Knowledge Chat",
        description: "Chat with your documents instantly",
        benefits: ["Instant answers", "Always up-to-date", "24/7 availability"],
      },
    },
    {
      category: "Payroll Processing",
      traditional: {
        icon: X,
        title: "Manual Calculations",
        description: "Spreadsheets prone to human error",
        problems: ["Calculation errors", "Compliance risks", "Time intensive"],
      },
      modern: {
        icon: Zap,
        title: "Automated Payroll",
        description: "AI ensures accuracy and compliance",
        benefits: ["Error-free processing", "Tax compliance", "Instant payslips"],
      },
    },
  ]

  return (
    <section id="benefits" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
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
              <BarChart3 className="mr-2 h-3 w-3" />
              Traditional vs Modern
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight"
          >
            Why Companies Are <span className="text-primary">Making the Switch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed"
          >
            See the dramatic difference between traditional HR methods and our AI-powered approach. The choice is clear
            when you compare side by side.
          </motion.p>
        </div>

        {/* Comparisons Grid */}
        <div className="space-y-8">
          {comparisons.map((comparison, index) => (
            <motion.div
              key={comparison.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="grid items-stretch gap-6 lg:grid-cols-2"
            >
              {/* Traditional Way */}
              <Card className="relative overflow-hidden border-border/50 bg-card hover:border-border/80 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-medium">
                      Traditional Way
                    </Badge>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <comparison.traditional.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground">{comparison.traditional.title}</h3>

                  <p className="text-muted-foreground mb-6 text-sm">{comparison.traditional.description}</p>

                  <div className="space-y-3">
                    {comparison.traditional.problems.map((problem) => (
                      <div key={problem} className="flex items-center text-sm text-muted-foreground">
                        <X className="mr-3 h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                        {problem}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Modern Way */}
              <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <Badge className="bg-primary text-primary-foreground text-xs font-medium">Our Way</Badge>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <comparison.modern.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground">{comparison.modern.title}</h3>

                  <p className="text-muted-foreground mb-6 text-sm">{comparison.modern.description}</p>

                  <div className="space-y-3">
                    {comparison.modern.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center text-sm text-foreground">
                        <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="bg-card border-border/50 mt-20 grid gap-8 rounded-2xl p-8 text-center sm:grid-cols-3 border"
        >
          <div>
            <div className="text-primary mb-2 text-4xl font-bold">80%</div>
            <div className="text-muted-foreground text-sm">Time Saved on Admin Tasks</div>
          </div>
          <div>
            <div className="text-primary mb-2 text-4xl font-bold">90%</div>
            <div className="text-muted-foreground text-sm">Faster Decision Making</div>
          </div>
          <div>
            <div className="text-primary mb-2 text-4xl font-bold">99%</div>
            <div className="text-muted-foreground text-sm">Accuracy Improvement</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
