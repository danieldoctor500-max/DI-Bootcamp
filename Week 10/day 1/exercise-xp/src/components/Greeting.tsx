interface GreetingProps {
  name: string
  messageCount: number
}

export function Greeting({ name, messageCount }: GreetingProps) {
  return (
    <div className="greeting-preview">
      <span className="greeting-spark" aria-hidden="true">*</span>
      <div>
        <p className="greeting-overline">GOOD TO SEE YOU</p>
        <h2>Hello, {name}<span className="greeting-period">.</span></h2>
        <p className="greeting-subtitle">You have {messageCount} new messages.</p>
      </div>
    </div>
  )
}