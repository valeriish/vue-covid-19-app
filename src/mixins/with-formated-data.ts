import { Vue } from 'vue-class-component'

/**
 * Add Format Data method to Component
 */
export class WithFormatData extends Vue {
  /**
   * Format Date
   */
  formatDate(value: any): string {
    if (Number.isNaN(value)) {
      return value
    }
    const y = Math.floor(value / 10000)
    const m = Math.floor((value - y * 10000) / 100)
    const date = new Date(y, m - 1, value - y * 10000 - m * 100)

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  /**
   * Format Number
   */
  formatNumber(value: any): string {
    return Number.isNaN(value) ? value : Number(value).toLocaleString('en-US')
  }
}
