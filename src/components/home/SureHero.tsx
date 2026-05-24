import { FC, HTMLAttributes, ReactElement } from 'react';
import SurePill from '@/components/SurePill';

type SureHeroProps = HTMLAttributes<HTMLDivElement> & {};

const SureHero: FC<SureHeroProps> = (): ReactElement => {
    return (
        <div>
            <div className="flex flex-row gap-2">
                <SurePill text="SurePlay AI" glow />
                <SurePill text="Decision Mapping" tint="mint" glow />
            </div>
        </div>
    );
};

SureHero.displayName = 'SureHero';

export default SureHero;
