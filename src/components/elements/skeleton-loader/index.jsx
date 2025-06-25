import React, { forwardRef } from 'react';
import "./index.css"

const SkeletonLoader = forwardRef((props, ref) => {
    return (
        <div className="skeleton-loader" style={{ zIndex: 999}} ref={ref}>
            <div className="skeleton-image"></div>
        </div>
    );
});

export default SkeletonLoader;
