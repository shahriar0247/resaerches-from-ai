import { BookOpen, Sparkles, Database, AlertCircle, Brain, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Learn about this site, its methodology, and how AI is used to generate and curate research.",
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-ink text-surface py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Brain className="text-accent-light mx-auto mb-4" size={40} />
          <h1 className="text-4xl font-bold mb-4">About This Site</h1>
          <p className="text-surface/70 text-lg">
            Our methodology, our tools, and how AI is used to generate and
            curate research.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-ink mb-6">
          Our Methodology
        </h2>
        <div className="space-y-4 text-text leading-relaxed">
          <p>
            This website is a personal research library. It collects in-depth
            research reports, video analyses, and documentation generated and
            curated with AI tools.
          </p>
          <p>
            Research on this site is produced using a combination of AI
            transcription, large-language-model analysis, deep-research
            workflows, and human review. Each article includes its sources,
            methodology notes, and — where applicable — links to the original
            material.
          </p>
          <p>
            We aim for accuracy and transparency. When a claim comes from a
            specific source, we cite it. When AI generates a summary or
            analysis, we label it as such. When there are limitations or
            caveats, we note them.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px flex-1 bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Principles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-ink mb-8 text-center">
          Our Principles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <BookOpen className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-ink mb-2">
              Sourced Claims
            </h3>
            <p className="text-sm text-text-secondary">
              Every factual claim links back to its source — a video, paper,
              survey, or dataset. No unsourced assertions.
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
              <Sparkles className="text-cyan" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-ink mb-2">
              AI Transparency
            </h3>
            <p className="text-sm text-text-secondary">
              When AI generates a summary, analysis, or report, it is labeled
              as AI-generated. We do not pass off AI output as human writing.
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Database className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-ink mb-2">
              Data-Driven
            </h3>
            <p className="text-sm text-text-secondary">
              Where possible, research is backed by quantitative data —
              academic studies, dating-app experiments, surveys, and trend
              reports.
            </p>
          </div>

          <div className="bg-surface rounded-xl p-6 border border-border">
            <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
              <CheckCircle className="text-cyan" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-ink mb-2">
              Limitations Noted
            </h3>
            <p className="text-sm text-text-secondary">
              Every research method has limits. We flag sample biases,
              self-report issues, and WEIRD-sample constraints where they
              apply.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 my-8">
          <div className="h-px flex-1 bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent/50" />
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Tools */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-ink mb-6">
          Tools &amp; Stack
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-ink">AI Transcription</h3>
              <p className="text-sm text-text-secondary">
                YouTube video transcripts are extracted and processed
                chapter-by-chapter for analysis.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-ink">Deep Research</h3>
              <p className="text-sm text-text-secondary">
                Multi-source research with citation tracking, evidence
                persistence, and structured report generation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-accent mt-1 flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-ink">Next.js + Firebase</h3>
              <p className="text-sm text-text-secondary">
                Built with Next.js 16, Tailwind CSS v4, and Firebase Firestore
                for data storage. Deployed on Vercel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section id="disclaimer" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-accent mt-1 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-ink mb-3">
                Disclaimer
              </h2>
              <div className="space-y-3 text-text leading-relaxed">
                <p>
                  This website is for informational and educational purposes
                  only. The research here is generated with AI tools and may
                  contain errors, biases, or outdated information.
                </p>
                <p>
                  AI-generated summaries and analyses should not be treated as
                  definitive truth. Always verify important claims against
                  primary sources before relying on them.
                </p>
                <p>
                  We strive for accuracy, but we are human (and the AI is a
                  model). If you find an error, please let us know so we can
                  correct it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
