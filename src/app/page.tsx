import SureHeader from '@/components/SureHeader';
import SureStarfield from '@/components/SureStarfield';
import { FC, HTMLAttributes, ReactElement } from 'react';

type HomeProps = HTMLAttributes<HTMLDivElement> & {};

const Home: FC<HomeProps> = (): ReactElement => {
    return (
        <>
            <SureHeader />
            <main></main>
            <footer></footer>

            <SureStarfield />
        </>
    );
};

export default Home;
