import Image from 'next/image';

// assets
import arrowIcon from '@/../public/svgs/Right Arrow Button.svg';

const Pagination = ({ pageNumber, totalPagesCount, handlePrevPage, handleNextPage }) => {
    return (
        <div className='w-full flex justify-between px-10 items-center mt-4 md:w-3/5 lg:w-2/5'>
            <button
                className='transform  w-10 justify-self-end'
                disabled={pageNumber === 1}
                onClick={handlePrevPage}
            >
                <Image
                    src={arrowIcon}
                    alt='arrow'
                    className={`mt-2 ${pageNumber === 1 && 'opacity-40'}`}
                />
            </button>

            <p className='text-sm justify-self-center text-accentColorNormal'>
                صفحه ی {pageNumber}
            </p>

            <button
                className='w-10 rotate-180 justify-self-start'
                disabled={totalPagesCount === 1 || totalPagesCount === pageNumber}
                onClick={handleNextPage}
            >
                <Image
                    src={arrowIcon}
                    alt='arrow'
                    className={`${(totalPagesCount === 1 || totalPagesCount === pageNumber) && 'opacity-40'}`}
                />
            </button>
        </div>
    );
};

export default Pagination;
