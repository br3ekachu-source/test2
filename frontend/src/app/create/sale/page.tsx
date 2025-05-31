import { CreateAdvertSale } from 'CreateAdvert/pages';

export default function CreateAdPage(props: { searchParams: { id: number } }) {
    return <CreateAdvertSale id={props.searchParams.id} />;
}
