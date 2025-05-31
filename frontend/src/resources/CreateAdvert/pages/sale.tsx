import { CreateAdvertTypes } from "CreateAdvert/shared/types/basicTypes";
import { CreateAdvertSteps } from "CreateAdvert/widgets/CreateAdvertSteps/CreateAdvertSteps"

export const CreateAdvertSale = ({id}: {id?: number}) => {
    return (
        <CreateAdvertSteps id={id} type={CreateAdvertTypes.Sale}/>
    );
}