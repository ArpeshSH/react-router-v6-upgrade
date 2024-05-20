import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ErrorImg from './ErrorImg';
import SvgGraphics from 'app/svgGraphics';
import { HStack, Link, Button, PageHeader } from '@dtsl/react';

import styles from './ErrorFallback.module.less';

const ErrorFallback = ({ backUrl, dashboardUrl, showHeader }) => {
	return (
		<Fragment>
			{
				showHeader ? (
					<nav
						className="header"
						style={{ display: "flex", justifyContent: "center" }}
					>
						<a href={dashboardUrl} className="topnav__control header__organization" rel="home">
						<span className="topnav__label">
							<SvgGraphics iconType="sendinblueLogo" />
						</span>
						</a>
					</nav>
				) : null
			}
			<div className={styles.errorFallback}>
				<main className={styles.main}>
					<div className="row row_middle">
						<section className="col_offset_1 col_5">
							<PageHeader 
								heading={
									<FormattedMessage id="errorpage.heading" />
								}
							/>
							{/* <ContentDivider /> */}
							<p>
								<b>
									<FormattedMessage id="errorpage.contentHeading" />
								</b>
							</p>
							<p>
								<FormattedMessage
									id="errorpage.content"
									values={{
										contactSupportLink: (
											<Link
												url='mailto:contact@sendinblue.com'
												variant='default'
												labelText={
													<FormattedMessage id="errorpage.contactSupportLink" />
												}
												onClick={() => {}} // handler function
											/>
										),
										platformStatusLink: (
											<Link
												url='http://status.sendinblue.com/'
												variant='external'
												labelText={
													<FormattedMessage id="errorpage.platformStatusLink" />
												}
												onClick={() => {}} // handler function
											/>
										),
									}}
								/>
							</p>
							<HStack spacing={1}>
								<Button
									label={
										<FormattedMessage id="errorpage.dashboardButton" />
									}
									onClick={() => {
										window.location.replace(dashboardUrl);
									}}
								/>
								<Button
									label={<FormattedMessage id="errorpage.backButton" />}
									variant="secondary"
									onClick={() => {
										window.location.replace(backUrl);
									}}
								/>
							</HStack>
						</section>
						<section className="col_offset_1 col_5">
							<ErrorImg />
						</section>
					</div>
				</main>
			</div>
		</Fragment>
	);
};

ErrorFallback.propTypes = {
	showHeader: PropTypes.bool,
	dashboardUrl: PropTypes.string,
	backUrl: PropTypes.string,
};

ErrorFallback.defaultProps = {
	showHeader: true,
	dashboardUrl: 'https://my.sendinblue.com/dashboard',
	backUrl: '/',
};

export default ErrorFallback;
