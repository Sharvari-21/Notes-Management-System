/**
 * TagBadge — displays a single tag string as a small pill.
 */
export default function TagBadge({ tag }) {
  return (
    <span className="tag-badge">
      #{tag}
    </span>
  );
}