import * as icons from "lucide-react";
import React from "react";
type LucideIconProps = React.ComponentProps<typeof icons.AlertCircle>;
export type IconName = keyof typeof icons;
interface BaseIconProps extends Omit<LucideIconProps, "ref"> {
    name: IconName;
}
declare const BaseIcon: React.NamedExoticComponent<BaseIconProps>;
export default BaseIcon;
//# sourceMappingURL=base-icon.d.ts.map