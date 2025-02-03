import PageHeader from "../common/PageHeader"
import Logo from "../displays-main-page/Logo"
import ServicesToolsShowcase from '../common/ToolsShowcase'
import '../../css/about.css'




function About() {
    return (
        <div className="container-About-Page">
            <div className="PageHeader">
                <PageHeader title={<> About < Logo /> </>}
                    description={'something about me and this app'} />
            </div>

            < ServicesToolsShowcase />

        </div>
    )
}

export default About
