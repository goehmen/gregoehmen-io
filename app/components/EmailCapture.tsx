import type { JSX } from 'react'

export default function EmailCapture(): JSX.Element {
  return (
    <section aria-label="Subscribe to email notifications" className="mt-12 pt-10 border-t border-card">
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Get notified when I publish
      </h2>
      <p className="text-foreground-secondary text-sm mb-6">
        New posts on AI-native building, product leadership, and shipping software with AI.
        No noise — just new posts.
      </p>
      <form
        action="https://buttondown.com/api/emails/embed-subscribe/GregOehmen"
        method="POST"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col sm:flex-row gap-3"
      >
        <input type="hidden" name="embed" value="1" />
        <label htmlFor="email-capture-input" className="sr-only">
          Email address
        </label>
        <input
          id="email-capture-input"
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
          className="flex-1 bg-card border border-white/20 rounded-lg px-4 py-2 text-foreground placeholder:text-foreground-secondary text-sm focus:outline-none focus:ring-2 focus:ring-accent-teal"
        />
        <button
          type="submit"
          className="bg-accent-teal text-white font-medium text-sm px-6 py-2 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </section>
  )
}
