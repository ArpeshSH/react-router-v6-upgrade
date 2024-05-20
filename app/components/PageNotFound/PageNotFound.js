import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './PageNotFound.module.less'

const PageNotFound = () => {
	return (
		<div className={`page__strut ${styles['empty__page']}`}>
			<main className={'page__content flex'}>
				<div className={`${styles['empty__page_content']}`}>
					<h1>
						<FormattedMessage id="PageNotFound.heading" />
					</h1>
					<p>
						<FormattedMessage id="PageNotFound.errorGenerated" />
					</p>
					<p>
						<FormattedMessage
							id="PageNotFound.wrongUrlEntered"
							values={{
								contact_support: (
									<a href="mailto:contact@sendinblue.com">
										<FormattedMessage id="PageNotFound.contactSupport" />
									</a>
								)
							}}
						/>
					</p>
					<p>
						<FormattedMessage
							id="PageNotFound.checkTheService"
							values={{
								here: (
									<a
										target="_blank"
										rel="noreferrer"
										href="http://status.sendinblue.com/"
									>
										<FormattedMessage id="PageNotFound.here" />
									</a>
								)
							}}
						/>
					</p>
					<p>&copy; <FormattedMessage id="PageNotFound.copyright" /></p>
				</div>
			</main >
		</div>
	)
}

export default PageNotFound;
