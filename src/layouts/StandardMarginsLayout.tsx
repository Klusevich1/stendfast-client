import React from 'react';

const StandardMarginsLayout = ({ children, styles = '' }: { children: React.ReactNode; styles?: string; }) => {
    return (
        <article className={styles}>
            <div className="w-full mx-auto max-w-[1440px] custom_container ">
                {children}
            </div>
        </article>
    );
};

export default StandardMarginsLayout;
