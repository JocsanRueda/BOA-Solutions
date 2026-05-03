import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { data } from "@/data/menu/menu-bar.data";
import { Menu, X } from "lucide-react";

export function DrawerMenu() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Menu/>
      </DrawerTrigger>
    
      <DrawerContent className="flex flex-col items-center justify-center">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Select an option</DrawerDescription>
        </DrawerHeader>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>
        <DrawerFooter>
          <DrawerClose>
            <X/>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}