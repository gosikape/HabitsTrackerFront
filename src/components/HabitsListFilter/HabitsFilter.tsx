import React from 'react';
import './HabitsFilter.css';

interface Props {
    activeOnly: boolean;
    onActiveOnlyChange: any;
}

export const HabitsFilter = (props: Props) => {
    return <form className="filter">
        <label>
            <input
                type="checkbox"
                name="filter"
                checked={props.activeOnly}
                onChange={(e) => props.onActiveOnlyChange(e.target.checked)}
            />
            {props.activeOnly ? ` Uncheck to see all habits ` : ` Show only active habits`}
        </label>
    </form>
};
