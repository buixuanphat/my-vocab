import { ActivityIndicator } from "react-native-paper"
import MyColor from "../utils/MyColor"

type Props = {
    color?: string
}

const MySpinner = ({ color }: Props) => {
    return (
        <ActivityIndicator
            size="small"
            color={color}
        />
    )
}

export default MySpinner