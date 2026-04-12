function StudyScene({ className = "", compact = false }) {
  return (
    <div className={`study-scene ${compact ? "compact" : ""} ${className}`.trim()} aria-hidden="true">
      <div className="study-board">
        <div className="study-board-top">
          <span className="study-dot" />
          <span className="study-dot" />
          <span className="study-dot" />
        </div>
        <div className="study-board-body">
          <div className="study-line long" />
          <div className="study-line mid" />
          <div className="study-line short" />
        </div>
      </div>

      <div className="study-card lesson">
        <span className="study-card-label">Live Class</span>
        <strong>Design Thinking</strong>
        <p>12 students online</p>
      </div>

      <div className="study-card notes">
        <span className="study-card-label">Study Notes</span>
        <strong>React Hooks</strong>
        <p>Ready to review</p>
      </div>

      <div className="study-chip progress">84% progress</div>
      <div className="study-chip quiz">Quiz unlocked</div>
      <div className="study-book" />
      <div className="study-pencil" />
    </div>
  );
}

export default StudyScene;
