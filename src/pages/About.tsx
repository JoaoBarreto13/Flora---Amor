/**
 * @module About
 * @description Página "Sobre Nós" da Flora & Amor.
 * Apresenta a história da floricultura, valores da marca, equipe e créditos do desenvolvedor.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import { Heart, Leaf, Star, Users, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const values = [
  {
    icon: Heart,
    title: "Amor em Cada Pétala",
    description: "Cada arranjo é criado com carinho e atenção aos detalhes, transmitindo sentimentos genuínos.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Trabalhamos com fornecedores locais e práticas sustentáveis para preservar a natureza.",
  },
  {
    icon: Star,
    title: "Excelência",
    description: "Selecionamos apenas as flores mais frescas e bonitas para garantir qualidade superior.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Valorizamos nossos clientes e construímos relações duradouras baseadas em confiança.",
  },
];

const team = [
  {
    name: "Ana Flores",
    role: "Fundadora & Designer Floral",
    description: "Com mais de 15 anos de experiência, Ana transforma flores em obras de arte.",
  },
  {
    name: "Carlos Silva",
    role: "Gerente de Operações",
    description: "Responsável pela logística e por garantir que cada entrega chegue perfeita.",
  },
  {
    name: "Maria Santos",
    role: "Atendimento ao Cliente",
    description: "Sempre pronta para ajudar, Maria garante que cada cliente tenha a melhor experiência.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <span className="text-primary font-medium mb-2 block">🌸 Sobre Nós</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Nossa História
            </h1>
            <p className="text-lg text-muted-foreground">
              A Flora & Amor nasceu do sonho de levar beleza e emoção através das flores.
              Desde 2015, transformamos momentos especiais em memórias inesquecíveis com
              arranjos florais únicos e personalizados.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <AnimatedSection animation="fade-in-up">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                De um Pequeno Ateliê ao Seu Coração
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Tudo começou em um pequeno ateliê no centro da cidade, onde Ana Flores,
                nossa fundadora, criava arranjos para amigos e familiares. A paixão pelas
                flores e o desejo de espalhar alegria rapidamente transformaram aquele
                hobby em um negócio próspero.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Hoje, a Flora & Amor é referência em arranjos artesanais, atendendo centenas
                de clientes em toda a cidade. Cada buquê que sai das nossas mãos carrega
                consigo uma história de dedicação, amor e cuidado com cada detalhe.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary font-medium mb-2 block">💐 Nossos Valores</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              O Que Nos Move
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="scale-in">
                <Card className="text-center h-full border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <span className="text-primary font-medium mb-2 block">👥 Nossa Equipe</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              Quem Faz Acontecer
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 150} animation="fade-in-up">
                <Card className="text-center border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🌺</span>
                    </div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Créditos do Desenvolvedor */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-xl mx-auto">
            <span className="text-primary font-medium mb-2 block">💻 Desenvolvido por</span>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              João Barreto
            </h2>
            <p className="text-muted-foreground mb-6">
              Este projeto foi criado com ❤️ usando React e TypeScript.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <a
                  href="https://www.linkedin.com/in/joaobarretoba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/JoaoBarreto13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
