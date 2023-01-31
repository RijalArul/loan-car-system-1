function interestRate (car_price, offer_terms, leasing_rates) {
  const monthlyInstallments = car_price / offer_terms
  const ratesPerMonth = (monthlyInstallments * leasing_rates) / 100 / 12
  const amountInstallmentPerMonth = monthlyInstallments + ratesPerMonth
  return amountInstallmentPerMonth
}

module.exports = interestRate
