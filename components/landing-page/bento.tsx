import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Globe from "@/components/magicui/globe";
import Marquee from "@/components/magicui/marquee";
import { CodeIcon, GlobeIcon, InputIcon } from "@radix-ui/react-icons";

const files = [
  {
    name: "navbar.tsx",
    body: "import { Button } from '@/components/ui/button'; export default function Navbar(){}",
  },
  {
    name: "main.py",
    body: "from flask import Flask, render_template def create_app(): app = Flask(__name__) @app.route('/') def index(): return render_template('index.html') return app",
  },
];

const features = [
  {
    Icon: CodeIcon,
    name: "Save your snippets",
    description: "Save your favorite code snippets in one place.",
    span: "col-span-3 lg:col-span-1",
    href: "/",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: InputIcon,
    name: "Search community snippets",
    description: "Search for snippets created by the community.",
    span: "col-span-3 lg:col-span-2",
    href: "/",
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <CommandInput placeholder="Search snippets..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recently Created">
            <CommandItem>navbar.tsx</CommandItem>
            <CommandItem>layout.jsx</CommandItem>
            <CommandItem>main.py</CommandItem>
            <CommandItem>animated-arrow.tsx</CommandItem>
            <CommandItem>index.html</CommandItem>
            <CommandItem>index.js</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    Icon: GlobeIcon,
    name: "Share Snippets to the World",
    description: "Just copy and send the link!",
    span: "col-span-3 lg:col-span-3",
    href: "/",
    background: (
      <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-80" />
    ),
  },
];

export async function Bento() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
