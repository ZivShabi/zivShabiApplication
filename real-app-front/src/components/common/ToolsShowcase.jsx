
import { useState, useEffect } from 'react'
import { toolsShowcase } from '../../data/dataAbout'
import '../../css/servicesToolsShowcase.css'

function ServicesToolsShowcase() {
    const [rotatedTools, setRotatedTools] = useState(toolsShowcase)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if (isPaused) return
        const interval = setInterval(() => {
            setRotatedTools((prevTools) => {
                const newTools = [...prevTools]
                const lastItem = newTools.pop()
                newTools.unshift(lastItem)
                return newTools
            })
        }, 1500)
        return () => clearInterval(interval)
    }, [isPaused])

    return (
        <div className="container-Services-Tools-Showcase "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)} >
            <div className="row g-4">
                {rotatedTools.map((service, index) => (
                    <div className="col-md-5 m-1" key={index}>
                        <div className="ToolsShowcase h-100 text-center card">
                            <div className="ToolsShowcase-body">
                                <i className={`${service.icon} ToolsShowcase i`}></i>
                                <h5 className="ToolsShowcase-title">{service.title}</h5>
                                <p className="ToolsShowcase-text">{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ServicesToolsShowcase
