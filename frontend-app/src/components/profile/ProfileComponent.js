import {useHighLevel} from "../auth/context/HighLevelAuthContext";

export function ProfileComponent() {
    const {role, shop} = useHighLevel()
}