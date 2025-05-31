import { CreateAdvertFracht } from 'CreateAdvert/pages';

export default function CreateAdPage(props: { searchParams: { id: number } }) {
    return <CreateAdvertFracht id={props.searchParams.id} />;
}
