import SureHero from '@/components/home/SureHero';
import SureNumbers from '@/components/home/SureNumbers';
import SureHeader from '@/components/SureHeader';
import SureStarfield from '@/components/SureStarfield';
import SureWorkflowMap from '@/components/home/SureWorkflowMap';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureFeatures from '@/components/home/SureFeatures';
import SureNewsSignUp from '@/components/SureNewsSignUp';

type HomeProps = HTMLAttributes<HTMLDivElement> & {};

const Home: FC<HomeProps> = (): ReactElement => {
    return (
        <>
            <SureHeader />
            <main className="px-[5%]">
                <SureHero />
                <SureNumbers />
                <SureWorkflowMap />
                <SureFeatures />
                <SureNewsSignUp />
            </main>
            <footer></footer>

            <SureStarfield />
        </>
    );
};

export default Home;
