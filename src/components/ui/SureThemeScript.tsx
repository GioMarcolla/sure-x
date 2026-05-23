import { FC, ReactElement } from 'react';

const SureThemeScript: FC<{}> = (): ReactElement => {
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    (function() {
                        const t = localStorage.getItem('theme');
                        if (t === 'dark' || t === 'light') {
                            document.documentElement.classList.add(t);
                        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                            document.documentElement.classList.add('dark');
                        } else {
                            document.documentElement.classList.add('light');
                        }
                    })();
                `,
            }}
        />
    );
};

SureThemeScript.displayName = 'SureThemeScript';

export default SureThemeScript;
