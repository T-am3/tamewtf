import { useState, useEffect } from 'react'
import { ScrollAnimation } from '../components/ScrollAnimation'

interface GuestbookEntry {
  id: string
  name: string
  message: string
  timestamp: string
  website?: string
  replies?: GuestbookEntry[]
  parentId?: string
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([])
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    website: ''
  })
  const [replyData, setReplyData] = useState({
    name: '',
    message: '',
    website: ''
  })
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('guestbook-entries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('guestbook-entries', JSON.stringify(entries))
  }, [entries])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return

    setIsSubmitting(true)

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      message: formData.message.trim(),
      website: formData.website.trim() || undefined,
      timestamp: new Date().toISOString(),
      replies: []
    }

    setEntries(prev => [newEntry, ...prev])
    setFormData({ name: '', message: '', website: '' })
    setIsSubmitting(false)
  }

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyData.name.trim() || !replyData.message.trim() || !replyingTo) return

    setIsSubmitting(true)

    const replyEntry: GuestbookEntry = {
      id: Date.now().toString(),
      name: replyData.name.trim(),
      message: replyData.message.trim(),
      website: replyData.website.trim() || undefined,
      timestamp: new Date().toISOString(),
      parentId: replyingTo
    }

    setEntries(prev => prev.map(entry => {
      if (entry.id === replyingTo) {
        return {
          ...entry,
          replies: [...(entry.replies || []), replyEntry]
        }
      }
      return entry
    }))

    setReplyData({ name: '', message: '', website: '' })
    setReplyingTo(null)
    setIsSubmitting(false)
  }

  const startReply = (entryId: string) => {
    setReplyingTo(entryId)
    setReplyData({ name: '', message: '', website: '' })
  }

  const cancelReply = () => {
    setReplyingTo(null)
    setReplyData({ name: '', message: '', website: '' })
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Guestbook
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Leave a message, share your thoughts, or just say hello. Your visit means a lot!
            </p>
          </div>
        </ScrollAnimation>

        {/* Guestbook Form */}
        <ScrollAnimation delay={200}>
          <div className="glass p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Leave a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                    Website (optional)
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                    placeholder="https://your-website.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors resize-none"
                  placeholder="Share your thoughts..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </ScrollAnimation>

        {/* Guestbook Entries */}
        <ScrollAnimation delay={400}>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-8">
              Messages ({entries.length + entries.reduce((total, entry) => total + (entry.replies?.length || 0), 0)})
            </h2>

            {entries.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No messages yet. Be the first to sign the guestbook!</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div key={entry.id} className="space-y-4">
                  <div className="glass p-6 rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {entry.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">
                            {entry.website ? (
                              <a
                                href={entry.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-300 transition-colors"
                              >
                                {entry.name}
                              </a>
                            ) : (
                              entry.name
                            )}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {formatDate(entry.timestamp)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => startReply(entry.id)}
                        className="text-gray-400 hover:text-white transition-colors text-sm px-3 py-1 rounded hover:bg-white/5"
                      >
                        Reply
                      </button>
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {entry.message}
                    </p>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === entry.id && (
                    <div className="ml-8 glass p-4 rounded-lg border-l-2 border-white/20">
                      <form onSubmit={handleReply} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="text"
                              value={replyData.name}
                              onChange={(e) => setReplyData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-2 bg-black/50 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50"
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div>
                            <input
                              type="url"
                              value={replyData.website}
                              onChange={(e) => setReplyData(prev => ({ ...prev, website: e.target.value }))}
                              className="w-full px-3 py-2 bg-black/50 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50"
                              placeholder="Website (optional)"
                            />
                          </div>
                        </div>
                        <textarea
                          value={replyData.message}
                          onChange={(e) => setReplyData(prev => ({ ...prev, message: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 bg-black/50 border border-gray-700/30 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 resize-none"
                          placeholder="Your reply..."
                          required
                        />
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-white text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            {isSubmitting ? 'Sending...' : 'Reply'}
                          </button>
                          <button
                            type="button"
                            onClick={cancelReply}
                            className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded text-gray-300 text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Display Replies */}
                  {entry.replies && entry.replies.length > 0 && (
                    <div className="ml-8 space-y-3">
                      {entry.replies.map((reply) => (
                        <div key={reply.id} className="glass p-4 rounded-lg border-l-2 border-white/20">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-xs">
                                  {reply.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-white font-medium text-sm">
                                  {reply.website ? (
                                    <a
                                      href={reply.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-gray-300 transition-colors"
                                    >
                                      {reply.name}
                                    </a>
                                  ) : (
                                    reply.name
                                  )}
                                </h4>
                                <p className="text-gray-400 text-xs">
                                  {formatDate(reply.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                            {reply.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  )
}