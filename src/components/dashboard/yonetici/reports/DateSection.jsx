

import { RxReset } from 'react-icons/rx';
import { IoMdCheckmark } from 'react-icons/io';
import styles from './dateSection.module.scss'

export default function DateSection({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    resetStartDate,
    resetEndDate,
    handleSubmit
}) {
    return (
        <div className={styles.filter_container}>
            <div className={styles.start_date}>
                <label htmlFor="startDate" className="me-2">
                    Başlangıç
                </label>
                <div className={styles.search_clear}>
                    <input
                        type="date"
                        name="startDate"
                        value={startDate}
                        className={styles.search_input}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    {startDate && (
                        <button
                            onClick={resetStartDate}
                            className={styles.clear_button}
                        >
                            <RxReset />
                        </button>
                    )}
                </div>
            </div>
            <div className={styles.end_date}>
                <label htmlFor="endDate" className="me-2">
                    Bitiş
                </label>
                <div className={styles.search_clear}>
                    <input
                        type="date"
                        name="endDate"
                        value={endDate}
                        className={styles.search_input}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    {endDate && (
                        <button
                            onClick={resetEndDate}
                            className={styles.clear_button}
                        >
                            <RxReset />
                        </button>
                    )}
                </div>
            </div>
            <button
                className={styles.button}
                onClick={() => {
                    handleSubmit(startDate, endDate);
                }}
            >
                {' '}
                <IoMdCheckmark />
            </button>
        </div>
    );
}
