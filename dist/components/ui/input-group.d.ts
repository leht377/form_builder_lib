import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { Button } from "../../components/ui/button";
declare function InputGroup({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare const inputGroupAddonVariants: (props?: {
    align?: "inline-end" | "inline-start" | "block-end" | "block-start";
} & import("class-variance-authority/types").ClassProp) => string;
declare function InputGroupAddon({ className, align, ...props }: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>): React.JSX.Element;
declare const inputGroupButtonVariants: (props?: {
    size?: "xs" | "sm" | "icon-xs" | "icon-sm";
} & import("class-variance-authority/types").ClassProp) => string;
declare function InputGroupButton({ className, type, variant, size, ...props }: Omit<React.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>): React.JSX.Element;
declare function InputGroupText({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element;
declare function InputGroupInput({ className, ...props }: React.ComponentProps<"input">): React.JSX.Element;
declare function InputGroupTextarea({ className, ...props }: React.ComponentProps<"textarea">): React.JSX.Element;
export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea, };
//# sourceMappingURL=input-group.d.ts.map