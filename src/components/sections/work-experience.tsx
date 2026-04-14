import { buttonVariants } from "../ui/button";
import { ShellSection } from "../ui/shell";
export interface workProps {
  href: string
  title: string
  status?: "freelancing" | "contract"
  buttonText?: string
}
const workExperience = () => {
  return ( 
    <ShellSection index={3}>

    </ShellSection>
   );
}
 
export default workExperience;