import { useState } from "react"
import CreateOrEditModal from "./CreateOrEditModal"
import { useTranslation } from "react-i18next";
import '../i18n'

interface BudgetTableProps {
    expenses: [ExpenseModel]
}

const BudgetTable: React.FC<BudgetTableProps> = ({ expenses }) => {

    const { t } = useTranslation()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectId, setSelectId] = useState(0)
    const [selectMoney, setSelectMoney] = useState(0)
    const [selectType, setSelectType] = useState("")

    const handleFormatDate = (date: Date) => {
        const formattedDate = date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
        return formattedDate
    }

    const handleEdit = async (id: number, money: number, type: string) => {
        setSelectId(id)
        setSelectMoney(money)
        setSelectType(type)
        setIsCreateModalOpen(true)
    }

    return (
        <div className="relative overflow-x-auto sm:rounded-lg p-2 flex justify-center rounded-[10px] w-full shadow-md bg-white ">
            <table className="w-full text-sm text-left">
                <thead className="text-lg shadow-md ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {t('date')}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t('money')}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t('type')}
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map(
                            (d) => {
                                return (
                                    <tr
                                        key={d.id}
                                        className=" shadow-md"
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium">
                                            {handleFormatDate(d.date)}
                                        </th>
                                        <td className="px-6 py-4">
                                            {d.moneyAmount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {d.type}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleEdit(d.id, d.moneyAmount, d.type)}>
                                                <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{t('edit')}</p>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
            {
                isCreateModalOpen ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <CreateOrEditModal
                                setIsCreateModalOpen={setIsCreateModalOpen}
                                selectedId={selectId}
                                selectedMoney={selectMoney}
                                selectedType={selectType}
                            />
                        </div>
                        <div
                            className="opacity-25 fixed inset-0 z-40 bg-black"
                        ></div>
                    </>
                ) : null}
        </div>
    )
}

export default BudgetTable