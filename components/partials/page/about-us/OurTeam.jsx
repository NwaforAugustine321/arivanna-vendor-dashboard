import React from 'react';

const OurTeam = ({ info }) => {
    let statusView;

    if (info && info.employees?.length > 0) {
        const items = info.employees.map((item, index) => {
            return (
                <figure  key={index}>
                    <div className="ps-block--ourteam">
                        {item.employee_picture ? (
                            <img
                                src={item.employee_picture}
                                alt={item.employee_first_name}
                            />
                        ) : (
                            <img
                                src="/static/img/users/our-team/placeholder_team.png"
                                alt={item.employee_first_name}
                            />
                        )}

                        <div className="ps-block__content">
                            <h4>
                                {item.employee_first_name}{' '}
                                {item.employee_middle_name}{' '}
                                {item.employee_last_name}
                            </h4>
                            <p>{item.title}</p>
                            <ul>
                                <li>
                                    <a target="_blank" href={item.linkedin}>
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </figure>
            );
        });
        statusView = <div className="ps-section__content">{items}</div>;
    } else {
        <p>No employees found.</p>;
    }
    return (
        <div className="ps-our-team">
            <div className="container">
                <div className="ps-section__header">
                    <h3>Meet Our Leaders!</h3>
                </div>
                {statusView}
            </div>
        </div>
    );
};

export default OurTeam;
