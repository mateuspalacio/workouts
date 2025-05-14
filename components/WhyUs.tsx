"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import CountUp from "react-countup";

export default function WhyUs() {
  return (
    <motion.section
      className="text-center space-y-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card className="bg-muted text-foreground shadow-md border border-muted/30">
        <CardContent className="py-10 px-6 space-y-6 text-slate-200">
          <h2 className="text-2xl font-bold text-center">Por que escolher a gente?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-center text-sm text-muted-foreground">
            <div>
              <p className="text-3xl font-bold text-slate-100">
                <CountUp end={20} duration={2.4} />
              </p>
              <p>treinos todo mês</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-100">
                <CountUp end={30} duration={2.6} />
              </p>
              <p>anos de experiência</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-100">
                <CountUp end={100} duration={2.8} />%
              </p>
              <p>foco em resultado</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
