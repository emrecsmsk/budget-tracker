"use client"

import { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CreateOrEditModal from './CreateOrEditModal';
import { useTranslation } from "react-i18next";
import '../i18n'
import { useDispatch, useSelector } from 'react-redux';
import ExpensesReducer from '../redux/reducers/ExpensesReducer';
import { RootState } from '../redux/store';



type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const SearchCard = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch<any>()
    const { user } = useSelector((state: RootState) => state.login)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [startDate, setStartDate] = useState<Value>();
    const [endDate, setEndDate] = useState<Value>();
    const [isStartDateOpen, setIsStartDateOpen] = useState(false)
    const [isEndDateOpen, setIsEndDateOpen] = useState(false)

    const handleChangeStartDate = (value: Value) => {
        setStartDate(value)
        setIsStartDateOpen(false)
    }

    const handleChangeEndDate = (value: Value) => {
        setEndDate(value)
        setIsEndDateOpen(false)
    }

    const handleFormatDate = (date: Value, isStartDate: boolean, isSearchFormat: boolean) => {
        if (isSearchFormat) {

            const newDate = date as Date

            var d = new Date(newDate),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            const finalDate = [year, month, day].join('-');

            if (isStartDate) {
                const formattedDateTime = `${finalDate} 00:00`;
                return formattedDateTime
            } else {
                const formattedDateTime = `${finalDate} 23:59`;
                return formattedDateTime
            }
        } else {
            const formattedDate = date!.toLocaleString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
            if (isStartDate) {
                const formattedDateTime = `${formattedDate} 00:00`;
                return formattedDateTime
            } else {
                const formattedDateTime = `${formattedDate} 23:59`;
                return formattedDateTime
            }
        }
    }

    const handleSearch = () => {
        if (startDate === undefined || endDate === undefined) {
            return
        }
        dispatch(ExpensesReducer.handleSearchedExpenses(user!.id, handleFormatDate(startDate, true, true), handleFormatDate(endDate, false, true)))
    }

    return (
        <div
            className="h-20 bg-white rounded-[10px] w-full shadow-md flex justify-evenly items-center text-xl"
        >
            <button
                className="border-[#D9D9D9] border-[1px] rounded-[10px] text-sm px-12 py-4"
                onClick={() => setIsStartDateOpen(true)}
            >
                {
                    startDate === undefined
                        ?
                        t('startDate')
                        :
                        handleFormatDate(startDate, true, false)
                }
            </button>
            <button
                className="border-[#D9D9D9] border-[1px] rounded-[10px] text-sm px-12 py-4"
                onClick={() => setIsEndDateOpen(true)}
            >
                {
                    endDate === undefined
                        ?
                        t('endDate')
                        :
                        handleFormatDate(endDate, false, false)
                }
            </button>
            <button
                className="border-[#EC8F5E] text-[#EC8F5E] border-[1px] rounded-[10px] text-sm px-12 py-4"
                onClick={handleSearch}
            >
                {t('search')}
            </button>
            <button
                onClick={() => setIsCreateModalOpen(true)}
            >
                <FaPlus
                    className="text-[#EC8F5E]"
                    size={30}
                />
            </button>
            {
                isStartDateOpen ?
                    <div className="fixed mt-96 z-50 ">
                        <Calendar onChange={handleChangeStartDate} value={startDate} />
                    </div>
                    :
                    null
            }
            {
                isEndDateOpen ?
                    <div className="fixed mt-96 z-50 ">
                        <Calendar onChange={handleChangeEndDate} value={endDate} />
                    </div>
                    :
                    null
            }
            {
                isCreateModalOpen ? (
                    <>
                        <div
                            className="opacity-25 fixed inset-0 z-40 bg-black" 
                            />
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <CreateOrEditModal
                                setIsCreateModalOpen={setIsCreateModalOpen}
                            />
                        </div>
                    </>
                ) : null}
        </div>
    );
}

export default SearchCard