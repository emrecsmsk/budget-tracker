import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../i18n'

interface BalanceCardProps {
    expenses: [ExpenseModel]
}

const BalanceCard: React.FC<BalanceCardProps> = ({ expenses }) => {

    const { t } = useTranslation()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const calculateExpenses = () => {       
            var total = 0

            if (expenses !== undefined) {
                expenses.forEach((expense) => {
                    if (expense.type === "Income") {
                        total += expense.moneyAmount
                    } else {
                        total -= expense.moneyAmount
                    }
                })
            }
            setTotal(total)
        }
        calculateExpenses()
    }, [expenses])

    return (
        <div
            className="h-20 bg-white rounded-[10px] w-full shadow-md flex justify-center items-center text-xl"
        >
            <h1>
                {t('balance')}:
            </h1>
            <h1>
                &nbsp;{total}₺
            </h1>
        </div>
    )
}

export default BalanceCard