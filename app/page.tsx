import TodoTableServer from "./TodoTableServer";
import Header from "@/components/ui/Header";
import { PiSlackLogo } from "react-icons/pi";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="container px-4 md:px-6 max-w-4xl mx-auto pt-8">
        <div className="flex flex-col gap-4 mb-8 font-mono">
          <h1 className="text-4xl md:text-5xl font-bold ">
            ToDo App with Slack
            <PiSlackLogo className="inline-block ml-2 mb-2" />
          </h1>
          <p className="text-lg text-muted-foreground">
            The status of todos is automatically notified in the Slack channel
          </p>
        </div>
      </div>
      <TodoTableServer />
    </div>
  );
}
