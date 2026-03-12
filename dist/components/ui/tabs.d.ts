import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";
declare function Tabs({ className, orientation, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare const tabsListVariants: (props?: {
    variant?: "line" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
declare function TabsList({ className, variant, ...props }: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>): import("react/jsx-runtime").JSX.Element;
declare function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
//# sourceMappingURL=tabs.d.ts.map