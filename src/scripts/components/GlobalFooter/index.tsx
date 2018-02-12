import * as React from "react"
import * as classNames from 'classnames'

const styles = require("./index.less")

export default ({ className, links, copyright } : {links: any[]; copyright: any; className?: string; }) => {
  const clsString = classNames(styles.globalFooter, className)
  return (
    <div className={clsString}>
      {
        links && (
          <div className={styles.links}>
            {
              links.map( (link) => (
                <a 
                  href={link.href}
                  key={link.title}
                  target={link.blankTarget ? "_blank" : "_self"}
                >
                  {link.title}
                </a>
              ))
            }
          </div>
        )
      }
      {
        copyright && <div className={styles.copyright}>{copyright}</div>
      }
    </div>
  )
}