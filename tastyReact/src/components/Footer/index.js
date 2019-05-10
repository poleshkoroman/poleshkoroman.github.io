import React, { Fragment } from 'react';

const Footer = () => {
    return (
        <Fragment>
            <div className="footer">
                <div className="first-column-rus">
                    <span>
                        tasty. Агрегатор кафе<br />
                        Минск, Октябрьская 10А<br />
                        Полешко Роман Олегович<br />
                        +375 (29) 275-15-29 МТС<br />
                    </span>
                </div>
                <div className="second-column-social">
                    <a className="social-vk" href="https://vk.com"><i className="fab fa-vk"></i></a>
                    <a className="social-instagram" href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
                    <a className="social-facebook" href="https://www.facebook.com/"><i className="fab fa-facebook"></i></a>
                    <a className="social-twitter" href="https://twitter.com/"><i className="fab fa-twitter"></i></a>
                </div>
                <div className="third-column-eng">
                    <span>
                        tasty. Аggregator cafe<br />
                        Minsk, Oktyabr'skaya 10А<br />
                        Poleshko Roman<br />
                        +375 (29) 275-15-29 МТS<br />
                    </span>
                </div>
            </div>
            <div className="container-succesfull">
                <div className="image-succesfull">
                    <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <div className="text-succesfull">
                    <span>Товар успешно добавлен в корзину!</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;