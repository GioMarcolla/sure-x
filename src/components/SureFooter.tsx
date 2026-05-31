const SureFooter = () => {
    return (
        <footer className="mt-32">
            <div className="flex items-center justify-center border-t-2 border-(--border-color) p-8 gap-8 text-center text-(--ink) backdrop-blur-lg">
                <p>
                    &copy; {new Date().getFullYear()} SurePlay. All rights
                    reserved.
                </p>
                <p>
                    Follow us on{' '}
                    <a
                        href="https://twitter.com/sureplay"
                        className="underline"
                    >
                        Twitter
                    </a>{' '}
                    and{' '}
                    <a
                        href="https://www.linkedin.com/company/sureplay"
                        className="underline"
                    >
                        LinkedIn
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

SureFooter.displayName = 'SureFooter';

export default SureFooter;
