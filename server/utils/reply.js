const Reply = function() {
      this.status = ''
}

Reply.prototype.success = function(...args) {
      this.echo('success',args)
}

Reply.prototype.fail = function(...args) {
      this.echo('fail', args)
}

Reply.prototype.echo = async function(...args) {
      return await this.config(args)
}

Reply.prototype.config = async function(objVals) {
      const payload = await objVals.reduce((acc, curr) => {
            acc[current[0]] = current[1]
            return acc
      },{})
      
      return {
            status: this.status,
            data: payload
      }
}

Reply.prototype.setResponse = function(payload) {
      this.response.data = payload
}

const reply = new Reply()

module.exports = reply

