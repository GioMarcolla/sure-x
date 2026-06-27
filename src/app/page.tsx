import SureHero from '@/components/home/SureHero';
import SureNumbers from '@/components/home/SureNumbers';
import SureHeader from '@/components/SureHeader';
import SureStarfield from '@/components/SureStarfield';
import SureWorkflowMap from '@/components/home/SureWorkflowMap';
import { FC, HTMLAttributes, ReactElement } from 'react';
import SureFeatures from '@/components/home/SureFeatures';
import SureNewsSignUp from '@/components/home/SureNewsSignUp';
import SureFooter from '@/components/SureFooter';
import SureResearch from '@/components/home/SureResearch';

type HomeProps = HTMLAttributes<HTMLDivElement> & {};

const Home: FC<HomeProps> = (): ReactElement => {
    return (
        <>
            <SureStarfield />

            <SureHeader className="z-99" />
            <main className="px-[5%]">
                <SureHero />
                <SureResearch />
                <SureNumbers />
                <SureWorkflowMap />
                <SureFeatures />
                <SureNewsSignUp />
            </main>
            <SureFooter />
        </>
    );
};

export default Home;
