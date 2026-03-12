export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f4fb] text-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#5b6fd8]">
            ROCHE
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-800">
            Welcome to RODA
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Roche Omnichannel Decision and Activation
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Craft intelligent omnichannel campaigns with AI-guided strategy and
            real-time budget simulation.
          </p>
        </header>

        <section className="mx-auto mb-8 max-w-4xl rounded-full bg-white p-3 shadow-lg shadow-slate-200/60">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              className="flex-1 rounded-full border border-slate-200 px-6 py-4 text-base outline-none placeholder:text-slate-400"
              defaultValue="I'm launching Product X in Germany with 500k CHF budget and want strong HCP engagement."
            />
            <button className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4 font-medium text-white shadow-md">
              Generate Plan
            </button>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Strategy Recommendation</h2>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                AI Recommended
              </span>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-[#faf9fe] p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800">
                    Full Activation Package
                  </h3>
                  <p className="mt-1 text-sm text-indigo-500">
                    Full Activation Blueprint
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
                  Maturity: Moderate
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Channel Mix
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      7-email web cadence
                    </li>
                    <li className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      Fully featured web experience
                    </li>
                    <li className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      Advanced TV / Programmatic
                    </li>
                    <li className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      Evidence search / competitor visibility
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Project Results
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="font-medium text-slate-800">Projected reach:</span>{" "}
                      210K HCPs
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="font-medium text-slate-800">Expected engagement:</span>{" "}
                      18% – 25%
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="font-medium text-slate-800">Estimated ROI:</span>{" "}
                      3.1x – 4.0x
                    </div>
                    <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
                      <span className="font-medium text-slate-800">Confidence score:</span>{" "}
                      80%
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm">
                  Simulate Budget Impact: 500k CHF
                </div>
                <button className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white">
                  AI Advice: Soften
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60">
            <h2 className="mb-5 text-xl font-semibold">Projected Results</h2>

            <div className="mb-4">
              <p className="text-4xl font-semibold text-slate-800">500k</p>
              <p className="text-sm text-slate-400">Projected HCP reach</p>
            </div>

            <div className="mb-6 h-40 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 p-4">
              <div className="flex h-full items-end gap-3">
                <div className="w-1/5 rounded-t-xl bg-indigo-200" style={{ height: "18%" }} />
                <div className="w-1/5 rounded-t-xl bg-indigo-300" style={{ height: "28%" }} />
                <div className="w-1/5 rounded-t-xl bg-indigo-400" style={{ height: "42%" }} />
                <div className="w-1/5 rounded-t-xl bg-violet-400" style={{ height: "64%" }} />
                <div className="w-1/5 rounded-t-xl bg-violet-500" style={{ height: "82%" }} />
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Reach uplift: <span className="font-medium">+20%</span>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Budget efficiency: <span className="font-medium">strong</span>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Estimated risk: <span className="font-medium">low–medium</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60">
          <h2 className="mb-5 text-xl font-semibold">Journey Orchestration</h2>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-5">
              <h3 className="mb-2 text-2xl font-semibold text-slate-800">Pre</h3>
              <p className="mb-4 text-sm text-slate-500">
                Build anticipation and prepare HCP audiences.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Teaser email</li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Disease awareness hub</li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Paid media burst</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-5">
              <h3 className="mb-2 text-2xl font-semibold text-slate-800">During</h3>
              <p className="mb-4 text-sm text-slate-500">
                Drive launch visibility and core engagement.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">HCP launch email</li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Web hub</li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">LinkedIn / programmatic</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-[#f8fbff] p-5">
              <h3 className="mb-2 text-2xl font-semibold text-slate-800">Post</h3>
              <p className="mb-4 text-sm text-slate-500">
                Sustain engagement and optimize follow-up.
              </p>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Follow-up email series</li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Retargeting</li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Content hub expansion</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60">
          <h2 className="mb-5 text-xl font-semibold">Channel Activation</h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Marketing Automation", "EMMA"],
              ["Paid Media", "Media, Programmatic, Advanced TV"],
              ["Search & GEO", "Roche.com, GEO, discoverability"],
              ["Web Experiences", "Roche.com, local web, campaign hubs"],
              ["Content Production", "The Lab"],
              ["Messaging", "WhatsApp / mobile messaging"],
            ].map(([title, subtitle]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 bg-[#faf9fe] p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500">{subtitle}</p>
                  </div>
                  <div className="h-6 w-11 rounded-full bg-emerald-400 p-1">
                    <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Recommended for this activation scenario.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/60">
          <h2 className="mb-5 text-center text-2xl font-semibold">
            Omnichannel Services at Your Fingertips
          </h2>

          <div className="mb-6 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
            {[
              "Marketing Automation",
              "Paid Media Optimization",
              "Search & GEO",
              "Web Experiences",
              "Content Production",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-100 bg-[#faf9fe] px-4 py-4 text-center text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-4 text-base font-medium text-white shadow-md">
              Generate Activation Plan
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}