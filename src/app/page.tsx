import SureHeader from '@/components/SureHeader';
import { FC, HTMLAttributes, ReactElement } from 'react';

type HomeProps = HTMLAttributes<HTMLDivElement> & {};

const Home: FC<HomeProps> = (): ReactElement => {
    return (
        <>
            <SureHeader />
            <main></main>
            <footer></footer>
        </>
    );
};

export default Home;
